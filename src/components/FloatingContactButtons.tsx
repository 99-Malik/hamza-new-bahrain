"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

const BRAND_ACCENTS: Record<string, string> = {
  lg: "#A50034",
  bosch: "#F80000",
  siemens: "#019997",
  samsung: "#000000",
};

export function FloatingContactButtons() {
  const params = useParams() as { company?: string | string[] };
  const currentCompany = Array.isArray(params?.company) ? params.company[0] : params?.company;

  const accentColor = useMemo(() => {
    if (currentCompany && BRAND_ACCENTS[currentCompany]) return BRAND_ACCENTS[currentCompany];
    return "var(--primary)";
  }, [currentCompany]);

  return (
    <>
      {/* WhatsApp - bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={() => openWhatsApp()}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 flex items-center justify-center"
          style={{
            backgroundColor: currentCompany ? accentColor : "#22c55e",
            color: "#fff",
          }}
          size="sm"
        >
          <Image width={28} height={28} alt="WhatsApp" src="/whatsapp.svg" className="brightness-0 invert" />
        </Button>
        <span className="sr-only">WhatsApp</span>
      </motion.div>

      {/* Call - bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={makePhoneCall}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-white flex items-center justify-center"
          style={{
            backgroundColor: accentColor,
            color: "#fff",
          }}
          size="sm"
        >
          <Phone className="size-7" />
        </Button>
        <span className="sr-only">Call Now</span>
      </motion.div>
    </>
  );
}
