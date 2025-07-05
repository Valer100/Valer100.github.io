import os

folder_listing_template = open("folder_listing_template.html", "r", encoding = "utf8").read()

item_template = """                    <a class="dir-item {:type}" href="{:name}" translate="no">
                        <font style="margin-right: auto;">
                            <span class="iconify" data-icon="{:icon}" data-width="20" data-height="20" style="margin-right: 8px; vertical-align: middle;"></span>
                            <p style="display: inline; vertical-align: middle;">{:name}</p>
                        </font>
                        <font style="width: 50px; text-align: right;">{:size}</font>
                    </a>\n
"""

back_to_parent_template = """                    <a class="dir-item" href="../" translate="no">
                        <font style="margin-right: auto;">
                            <span class="iconify" data-icon="ph:arrow-bend-left-up-bold" data-width="16" data-height="16" style="margin-right: 8px; vertical-align: middle;"></span>
                            <p style="display: inline; vertical-align: middle;">...</p>
                        </font>
                    </a>\n
"""

def convert_size_to_appropiate_unit(size):
    if size < 1000: return str(round(size)) + " B"
    elif size < 1000000: return str(round(size / 1000)) + " KB"
    elif size < 1000000000: return str(round(size / 1000000)) + " MB"
    else: return str(round(size / 1000000000)) + " GB"

def get_right_icon(path):
    if os.path.isdir(path):
        return "fluent:folder-20-filled"
    else:
        basename_parts = os.path.basename(path).split(".")
        basename_parts.reverse()
        extension = basename_parts[0]

        if extension.lower() in ["png", "jpg", "jpeg", "tiff", "tif", "apng", "gif", "bmp", "webp", "svg", "ico"]:
            return "fluent:image-20-filled"
        elif extension.lower() in ["mp3", "wav", "flac", "aac", "ogg", "m4a", "opus", "wma"]:
            return "fluent:music-note-2-20-filled"
        elif extension.lower() in ["mp4", "mkv", "avi", "mov", "webm", "flv", "wmv"]:
            return "fluent:video-clip-20-filled"
        elif extension.lower() in ["txt", "md", "csv", "log", "json", "xml", "yaml", "yml"]:
            return "fluent:document-text-20-filled"
        elif extension.lower() in ["iso", "img", "vhd", "vhdx", "vdi", "vmdk", "bin", "nrg"]:
            return "fluent:cd-16-filled"
        elif extension.lower() in ["zip", "rar", "7z", "tar", "tgz", "gz", "bz2", "xz", "lzma", "cab"]:
            return "fluent:folder-zip-20-filled"
        elif extension.lower() in ["cmd", "com", "bat", "vbs", "ps", "ps1", "ahk"]:
            return "fluent:script-20-filled"
        elif extension.lower() in ["py", "pyw", "cpp", "cs", "c", "h", "hpp", "js", "vb"]:
            return "fluent:code-block-20-filled"
        elif extension.lower() == "exe":
            return "fluent:window-20-filled"
        elif extension.lower() == "reg":
            return "fluent:apps-20-filled"
        elif extension.lower() == "apk":
            return "mingcute:android-2-fill"
        else:
            return "fluent:document-20-filled"

def generate(parent):
    parent_abs = os.path.abspath(parent)
    is_main_dir = parent_abs == os.path.join(os.path.dirname(__file__), "files")

    breadcrumb_html = ""
    dir_list = []
    files = []
    folders = []

    for stuff in os.listdir(parent_abs):
        if os.path.isfile(os.path.join(parent_abs, stuff)): files.append(stuff)
        else: folders.append(stuff)

    dir_list.extend(sorted(folders, key = str.casefold))
    dir_list.extend(sorted(files, key = str.casefold))

    dir_list_html = back_to_parent_template if not is_main_dir else ""

    for stuff in dir_list:
        stuff_path = os.path.join(parent_abs, stuff)

        if not (os.path.isfile(stuff_path) and stuff == "index.html"):
            icon = get_right_icon(stuff_path)
            size = convert_size_to_appropiate_unit(os.path.getsize(stuff_path)) if os.path.isfile(stuff_path) else ""

            dir_list_html += item_template.replace("{:name}", stuff).replace("{:size}", size).replace("{:icon}", icon).replace("{:type}", "folder" if os.path.isdir(stuff_path) else "file")

            if os.path.isdir(stuff_path): generate(stuff_path)

    breadcrumb_stops = parent_abs.replace(os.path.dirname(__file__), "").strip("\\").strip("/").split(os.path.sep)

    for i in range(len(breadcrumb_stops)):
        url = ""
        for j in range(i + 1):
            url += (breadcrumb_stops[j] + "/")

        if i != len(breadcrumb_stops) - 1:
            breadcrumb_html += f"/ <a href=\"/{url}\">{breadcrumb_stops[i]}</a> "
        else:
            breadcrumb_html += f"/ <p style=\"display: inline;\">{breadcrumb_stops[i]}</p> "

    open(os.path.join(parent_abs, "index.html"), "w", encoding = "utf8").write(folder_listing_template.replace("{:stuff}", dir_list_html.strip("\n")).replace("{:name}", os.path.basename(parent_abs)).replace("{:breadcrumb}", breadcrumb_html).replace("{:noanimate}", "noanimate" if not is_main_dir else "").replace("{:rel_path}", parent_abs.replace(os.path.dirname(__file__), "").replace("\\", "/")))

generate(os.path.join(os.path.dirname(__file__), "files"))