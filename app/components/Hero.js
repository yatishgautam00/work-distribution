"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmployeeLogin from "./EmployeeLogin";
import EmployerLogin from "./EmployerLogin";

function Hero() {
  
  return (
    <section className="md:px-14 h-full mt-5">
     

      <div className="mx-auto max-w-screen-full  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-full gap-10 rounded-lg  lg:order-last lg:h-full">
            <EmployeeLogin />
          </div>

          <div className="relative h-64  rounded-lg sm:h-80 lg:order-last lg:h-full">
            <EmployerLogin />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
