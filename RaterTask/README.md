# Rater Task Guide (For Researchers)

This guide explains exactly how to prepare files and run the Rater Task.

## What You Need

1. Creature images (`.png` files)
2. Creature descriptions (`.txt` files)

## Folder Structure

Use these folders:

- `RaterTask/DrawingsNDescriptions/PNGs/` for your participants' creatures PNGs
- `RaterTask/DrawingsNDescriptions/TXTs/` for their descriptions ("name: description")

Do not place rating files in other folders.

## Recommended File Naming

Use matching names for each pair:

- `P001_creature1.png`
- `P001_creature1.txt`

Also supported:

- `P001_creature1_draw.png`
- `P001_creature1.txt`

If no TXT is found, the image is still included, but the description will be empty.

## Step-by-Step

1. Copy your `.png` files into `RaterTask/DrawingsNDescriptions/PNGs/`
2. Copy your `.txt` files into `RaterTask/DrawingsNDescriptions/TXTs/`


3. Update the "manifest":
- If you have a Mac/Linux: double-click `RaterTask/tools/Update_Manifest.command`
- If you have a Windows: double-click `RaterTask/tools/Update_Manifest_Windows.bat`

4. Open: `RaterTask/RaterTask_index.html` to check the task is ready.
5. Share the entire `RaterTask` folder with the raters and ask them to open `RaterTask_index.html` to complete the task.

## Important Rule

Run the manifest update every time you add, remove, or rename PNG/TXT files.

## Quick Check Before Running

1. Are all images `.png`?
2. Are all descriptions `.txt`?
3. Did you run `Update_Manifest.command` after changes?
4. Are files in the correct `PNGs` and `TXTs` folders?

## Troubleshooting

If you see `Catalog load failed` on the setup screen:

1. Run `RaterTask/tools/Update_Manifest.command` again
2. Confirm `RaterTask/DrawingsNDescriptions/catalog_manifest.js` exists
3. Re-open `RaterTask/RaterTask_index.html`

If `Update_Manifest.command` does not open:

1. Right-click it and choose **Open**
2. If macOS blocks it, open **System Settings > Privacy & Security** and allow it
