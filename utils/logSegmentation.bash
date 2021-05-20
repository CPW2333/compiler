#!/bin/bash
cp ../logs/access.log ../logs/access/$(date -d"yesterday" +%Y-%m-%d).access.log
echo "" > ../logs/access.log
cp ../logs/err.log ../logs/err/$(date -d"yesterday" +%Y-%m-%d).err.log
echo "" > ../logs/err.log
cp ../logs/out.log ../logs/out/$(date -d"yesterday" +%Y-%m-%d).out.log
echo "" > ../logs/out.log