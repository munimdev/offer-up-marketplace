import Rating from "@/components/misc/Rating";
import Meter from "@/components/icons/Meter";
import Fuel from "@/components/icons/Fuel";
import Message from "@/components/icons/Message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Heart,
  Share2,
  MapPin,
  Globe,
  CalendarDays,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-5">
      <h3 className="text-black font-bold text-3xl">2020 BMW 7 Series Sedan</h3>
      <h3 className="text-black font-bold text-3xl">$53,500</h3>
      <div className="flex gap-2">
        <div className="flex items-ceneter">
          <Meter /> <span>32,764 Miles</span>
        </div>
        <div className="flex items-center">
          <Fuel /> <span>17/25 MPG</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Badge className="bg-gray-300 text-black mx-1">Used</Badge>
        <Badge className="bg-gray-300 text-black mx-1">Used</Badge>
        <Badge className="bg-gray-300 text-black mx-1">Used</Badge>
        <Badge className="bg-gray-300 text-black mx-1">Used</Badge>
        <Badge className="bg-gray-300 text-black mx-1">Used</Badge>
      </div>
      <p>
        <span className="font-semibold">VIN</span> WBA7U2C05LCD52147
      </p>
      <p>Posted 24 days ago in Laurence Harbor, NJ</p>
      <p>Condition: Good</p>
      <p>Vehicles - Cars & Trucks</p>
      <Button className="bg-primary hover:bg-primary rounded-full">
        <Phone fill="#fff" size={18} className="mr-2" /> Call for Details
      </Button>
      <Button className="bg-white text-primary border border-primary hover:bg-white rounded-full">
        <Message className="mr-2" /> Chat
      </Button>
      <div className="flex justify-between text-primary">
        <span className="cursor-pointer">
          <Heart size={20} className="mr-2 inline-block" /> Save
        </span>
        <span className="cursor-pointer">
          <Share2 className="mr-2 inline-block" />
          Share
        </span>
      </div>
      <div className="flex gap-4 border-y py-4 my-4">
        <div>
          <img src="images/Dealership.png" className="rounded-full" alt="" />
        </div>
        <div>
          <p className="text-black font-bold">Unique Auto Part</p>
          <div className="flex gap-1 text-xs">
            <span>3.8</span>
            <Rating />
            <span>(Google Reviews)</span>
          </div>
          <p>Verified Auto Dealer</p>
        </div>
      </div>
      <div>
        <p className="text-primary">
          <MapPin className="inline" size={24} /> 2090 NJ-35, South Amboy, NJ
          08879, USA
        </p>
        <p className="text-primary mt-1">
          <Globe className="inline" size={24} /> https://www.uniqueautomall.com/
        </p>
        <p className="mt-1">
          <Phone className="inline" />
          (732) 707-3223
        </p>
        <div className="mt-1">
          <CalendarDays className="inline" size={24} />{" "}
          <span className="inline-flex flex-col">
            <p className="font-semibold">Open tomorrow</p>
            <p>Hours 9:00 AM – 8:00 PM</p>
            <p className="text-primary font-semibold">See hours of operation</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;