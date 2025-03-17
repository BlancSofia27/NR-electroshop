import { 
  FaHeadphones, FaCamera, FaPlug, FaLaptop, 
  FaMicrophone, FaBatteryFull, FaHdd, FaChargingStation, FaHome, FaStar
} from "react-icons/fa";
import { BsEarbuds, BsSpeakerFill } from "react-icons/bs";
import { PiHairDryerFill, PiPlugChargingFill } from "react-icons/pi";
import { LuTabletSmartphone } from "react-icons/lu";
import { IoFlashlightSharp, IoGameController, IoPhonePortraitOutline, IoWatch } from "react-icons/io5";
import { BiSolidHappyAlt } from "react-icons/bi";
import { TbBottle, TbCategoryPlus } from "react-icons/tb";
import { MdOutlineControlCamera } from "react-icons/md";
import { LiaFanSolid } from "react-icons/lia";

// Solo pasamos las referencias de los iconos, no los JSX con el icono renderizado.
export const categories = [
  { name: "Auricular Pequeno", icon: FaHeadphones },
  { name: "Auriculares", icon: BsEarbuds },
  { name: "Belleza", icon: PiHairDryerFill },
  { name: "Cables", icon: FaPlug },
  { name: "Cámaras de Seguridad", icon: FaCamera },
  { name: "Cargadores", icon: PiPlugChargingFill },
  { name: "Celulares y Tablets", icon: LuTabletSmartphone },
  { name: "Computación y Redes", icon: FaLaptop },
  { name: "Convertidores", icon: FaHdd },
  { name: "Entretenimiento", icon: BiSolidHappyAlt },
  { name: "Fundas para Celulares", icon: IoPhonePortraitOutline },
  { name: "Hogar", icon: FaHome },
  { name: "Gamers", icon: IoGameController },
  { name: "Luces y Linternas", icon: IoFlashlightSharp },
  { name: "Micrófonos", icon: FaMicrophone },
  { name: "Novedades", icon: FaStar },
  { name: "Parlantes", icon: BsSpeakerFill },
  { name: "Pendrives y MicroSD", icon: FaHdd },
  { name: "Pilas y Cargadores", icon: FaBatteryFull },
  { name: "Powerbank", icon: FaChargingStation },
  { name: "Reloj Smart Watch", icon: IoWatch },
  { name: "Soportes", icon: MdOutlineControlCamera },
  { name: "Termos/Botellas", icon: TbBottle },
  { name: "Varios", icon: TbCategoryPlus },
  { name: "Ventiladores", icon: LiaFanSolid }
];
