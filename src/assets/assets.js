import { Folder, FolderPlus, List, Music } from "lucide-react";
import logo from "./gitar.jpg";
export const assets = { logo };
export const SIDE_MENU_DATA = [
  
  {
    id: 1,
    label: "Add Song",
    icon: Music,
    path: "/add-song",
  },
  {
    id: 2,
    label: "List Songs",
    icon: List,
    path: "/list-songs",
  },
  {
    id: 3,
    label: "Add Album",
    icon: FolderPlus,
    path: "/add-album",
  },
  {
    id: 4,
    label: "List Albums",
    icon: Folder,
    path: "/list-albums",
  },
];
