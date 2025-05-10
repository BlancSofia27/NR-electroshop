import { 
  FaHeadphones, FaToolbox, FaHome, FaLightbulb, 
  FaPlug, FaChargingStation, FaGamepad, FaGift, FaMicrophone, FaLaptop 
} from "react-icons/fa";
import { BsEarbuds, BsSpeakerFill } from "react-icons/bs";
import { PiHairDryerFill } from "react-icons/pi";
import { TbCategoryPlus, TbBottle } from "react-icons/tb";
import { BiSolidHappyAlt } from "react-icons/bi";
import { MdOutlineBathroom } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";

export const categories = [
  { name: "AUTO/BICI/TV Y CELL", icon: FaPlug },
  { name: "AURICULARES BLUETOOTH", icon: FaHeadphones },
  { name: "AURICULARES EARPHONE", icon: BsEarbuds },
  { name: "AURICULARES VINCHA C/CABLE", icon: FaHeadphones },
  { name: "BELLEZA", icon: PiHairDryerFill },
  { name: "CABLES/ADAPTADORES", icon: FaPlug },
  { name: "CARGADORES Y FUENTES", icon: FaChargingStation },
  { name: "CONSOLAS Y COMPUTACION", icon: FaGamepad },
  { name: "COPA AMERICA", icon: BiSolidHappyAlt },
  { name: "GRIFERIA", icon: MdOutlineBathroom },
  { name: "HERRAMIENTAS", icon: FaToolbox },
  { name: "HOGAR", icon: FaHome },
  { name: "ILUMINACION", icon: FaLightbulb },
  { name: "LIBRERIA y OFICINA", icon: LuNotebookPen },
  { name: "MEMORIA Y PENDRIVE", icon: FaLaptop },
  { name: "NAVIDAD", icon: FaGift },
  { name: "PARLANTES y MICROFONOS", icon: FaMicrophone },
  { name: "TECNOLOGIA", icon: FaLaptop },
  { name: "TERMOS Y VASOS", icon: TbBottle },
  { name: "TODO PARA EL NIÑO", icon: BiSolidHappyAlt },
  { name: "VARIEDADES", icon: TbCategoryPlus },
];
