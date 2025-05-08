"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "../stores/user.store";

export default function Navbar() {
  const { user, token } = useUserStore();

  return (
    <NavigationMenu className="bg-blue-950 !w-full !max-w-full h-16 flex items-center justify-start px-10">
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        {!user || !token ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/login"
              className={navigationMenuTriggerStyle()}
            >
              Login
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/submission"
                className={navigationMenuTriggerStyle()}
              >
                Submissão
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/evaluation"
                className={navigationMenuTriggerStyle()}
              >
                Lista de artigos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/evaluation"
                className={navigationMenuTriggerStyle()}
              >
                Meus artigos
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
