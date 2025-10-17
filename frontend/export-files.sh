#!/bin/bash
# Collects all *.ts, *.tsx, *.properties, *.kt, and *.json files
# and writes their path + content into output.txt

OUTPUT_FILE="output.txt"

# Clear or create the output file
> "$OUTPUT_FILE"

# Find and process matching files
find . -type f \( \
  -name "*.ts" -o \
  -name "*.tsx" -o \
  -name "*.properties" -o \
  -name "*.kt" -o \
  -name "*.json" \
\) ! -path "*/node_modules/*" ! -path "*/build/*" ! -path "*/dist/*" | while read -r file; do
  echo "===== FILE: $file =====" >> "$OUTPUT_FILE"
  cat "$file" >> "$OUTPUT_FILE"
  echo -e "\n" >> "$OUTPUT_FILE"
  echo "Added: $file"
done

echo "✅ All files exported to $OUTPUT_FILE"
