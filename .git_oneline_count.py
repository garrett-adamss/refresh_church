#!/usr/bin/env python3
"""Emit git log --oneline -10 and rev-list --count HEAD without git."""
import struct
import sys
import zlib
from pathlib import Path

REPO = Path("/Users/gar/source/refresh_church")
GIT = REPO / ".git"
OBJECTS = GIT / "objects"
PACK_DIR = OBJECTS / "pack"


class PackReader:
    def __init__(self) -> None:
        self.pack = list(PACK_DIR.glob("*.pack"))[0].read_bytes()
        self.offsets = self._read_idx()
        self.cache: dict[str, bytes] = {}

    def _read_idx(self) -> dict[str, int]:
        data = list(PACK_DIR.glob("*.idx"))[0].read_bytes()
        if data[:4] != b"\xfftOc":
            raise SystemExit("unsupported idx")
        fanout = struct.unpack(">256I", data[8 : 8 + 256 * 4])
        n = fanout[255]
        off = 8 + 256 * 4
        oids = [data[off + i * 20 : off + (i + 1) * 20].hex() for i in range(n)]
        off += n * 20
        off += n * 4
        offsets = list(struct.unpack(f">{n}I", data[off : off + n * 4]))
        large_start = off + n * 4
        resolved: list[int] = []
        for o in offsets:
            if o & 0x80000000:
                idx = o & 0x7FFFFFFF
                pos = large_start + idx * 8
                resolved.append(struct.unpack(">Q", data[pos : pos + 8])[0])
            else:
                resolved.append(o)
        return dict(zip(oids, resolved))

    def read(self, oid: str) -> bytes:
        if oid in self.cache:
            return self.cache[oid]
        loose = OBJECTS / oid[:2] / oid[2:]
        if loose.is_file():
            raw = zlib.decompress(loose.read_bytes())
        elif oid in self.offsets:
            raw = self._read_pack_object(self.offsets[oid])[1]
        else:
            raise KeyError(oid)
        self.cache[oid] = raw
        return raw

    def _read_pack_object(self, offset: int) -> tuple[int, bytes]:
        typ, comp, _ = self._read_pack_entry(offset)
        return typ, comp

    def _inflate(self, pack: bytes, offset: int) -> bytes:
        return zlib.decompressobj().decompress(pack[offset:])

    def _read_pack_entry(self, offset: int) -> tuple[int, bytes, int]:
        start = offset
        c = self.pack[offset]
        offset += 1
        typ = (c >> 4) & 7
        while c & 0x80:
            c = self.pack[offset]
            offset += 1
        if typ == 6:
            pos = offset
            c = self.pack[pos]
            pos += 1
            ofs = c & 0x7F
            while c & 0x80:
                ofs = (ofs + 1) << 7
                c = self.pack[pos]
                pos += 1
                ofs += c & 0x7F
            base_start = pos - ofs
            _, base, _ = self._read_pack_entry(base_start)
            offset = pos
            comp = self._apply_delta(base, self._inflate(self.pack, offset))
            return typ, comp, start
        if typ == 7:
            base_oid = self.pack[offset : offset + 20].hex()
            offset += 20
            base = self.read(base_oid)
            comp = self._apply_delta(base, self._inflate(self.pack, offset))
            return typ, comp, start
        comp = self._inflate(self.pack, offset)
        return typ, comp, start

    @staticmethod
    def _apply_delta(base: bytes, delta: bytes) -> bytes:
        pos = 0

        def read_size() -> int:
            nonlocal pos
            size = shift = 0
            while True:
                c = delta[pos]
                pos += 1
                size |= (c & 0x7F) << shift
                if not (c & 0x80):
                    break
                shift += 7
            return size

        read_size()
        result_size = read_size()
        out = bytearray(result_size)
        res_pos = 0
        while pos < len(delta):
            cmd = delta[pos]
            pos += 1
            if cmd & 0x80:
                cp_off = cp_size = 0
                if cmd & 0x01:
                    cp_off = delta[pos]
                    pos += 1
                if cmd & 0x02:
                    cp_off |= delta[pos] << 8
                    pos += 1
                if cmd & 0x04:
                    cp_off |= delta[pos] << 16
                    pos += 1
                if cmd & 0x08:
                    cp_off |= delta[pos] << 24
                    pos += 1
                if cmd & 0x10:
                    cp_size = delta[pos]
                    pos += 1
                if cmd & 0x20:
                    cp_size |= delta[pos] << 8
                    pos += 1
                if cmd & 0x40:
                    cp_size |= delta[pos] << 16
                    pos += 1
                if cp_size == 0:
                    cp_size = 65536
                out[res_pos : res_pos + cp_size] = base[cp_off : cp_off + cp_size]
                res_pos += cp_size
            else:
                out[res_pos : res_pos + cmd] = delta[pos : pos + cmd]
                res_pos += cmd
                pos += cmd
        return bytes(out[:res_pos])


def parse_commit(data: bytes) -> tuple[str | None, str]:
    nul = data.index(b"\0")
    text = data[nul + 1 :].decode("utf-8", errors="replace")
    header, _, body = text.partition("\n\n")
    parent = None
    for line in header.splitlines():
        if line.startswith("parent "):
            parent = line.split()[1]
    subject = body.splitlines()[0] if body else ""
    return parent, subject


def walk(pack: PackReader, start: str):
    oid: str | None = start
    while oid:
        raw = pack.read(oid)
        if b"\0" not in raw:
            break
        parent, subject = parse_commit(raw)
        yield oid[:7], subject
        oid = parent


def main() -> None:
    pack = PackReader()
    head = (GIT / "refs/heads/main").read_text().strip()
    lines = list(walk(pack, head))
    count = len(lines)
    for short, subject in lines[:10]:
        print(f"{short} {subject}")
    print("---")
    print(count)


if __name__ == "__main__":
    main()
