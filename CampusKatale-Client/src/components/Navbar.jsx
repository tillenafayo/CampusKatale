import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconSearch,
  IconUser,
  IconShoppingCart,
  IconSun,
  IconMoon,
  IconPlus,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Drawer,
  Group,
  Menu,
  Text,
  TextInput,
  Transition,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import "@fontsource-variable/lexend";
import logo from "../assets/CampusKatale.png";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useHotkeys([["mod+J", () => setDark((v) => !v)]]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchValue}`);
  };

  return (
    <>
      <Transition
        mounted
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <header
            style={styles}
            className={`fixed top-0 left-0 w-full z-50 border-b transition-all font-[Lexend] ${
              dark
                ? "bg-[#0C0D19] border-[#177529]"
                : "bg-white border-[#E5E7EB]"
            } ${scrolled ? "shadow-sm py-2" : "py-3"}`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
              {/* Logo Section */}
              <Group>
                <ActionIcon variant="transparent" onClick={open}>
                  <IconMenu2 size={24} color={dark ? "#97C040" : "#177529"} />
                </ActionIcon>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <img
                    src={logo}
                    alt="Campus Katale Logo"
                    className="w-[130px] md:w-[150px] h-auto"
                  />
                </div>
              </Group>

              {/* Search Input */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex w-1/2 justify-center"
              >
                <TextInput
                  icon={<IconSearch size={18} color="#177529" />}
                  radius="md"
                  placeholder="Search campus deals..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                  styles={{
                    input: {
                      backgroundColor: dark ? "#1E293B" : "#F9FAFB",
                      color: dark ? "#FFFFFF" : "#0C0D19",
                      border: "1px solid #E5E7EB",
                      fontFamily: "Lexend Variable",
                    },
                  }}
                  className="w-full"
                />
              </form>

              {/* Right Section */}
              <Group gap="sm">
                {/* AddListing */}
                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <Button
                      variant="outline"
                      leftSection={<IconPlus size={16} />}
                      className={`font-medium flex items-center gap-2 transition-colors duration-300 ${
                        dark
                          ? "text-[#97C040] border-[#97C040] hover:bg-[#97C040] hover:text-white"
                          : "text-[#177529] border-[#177529] hover:bg-[#177529] hover:text-white"
                      }`}
                      onClick={() => navigate("/add-listing")}
                    >
                      Add Listing
                    </Button>
                  </Menu.Target>
                </Menu>
                {/* User Menu */}
                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      leftSection={<IconUser size={16} />}
                      className={`font-medium ${
                        dark
                          ? "text-[#97C040] hover:text-[#F8C810]"
                          : "text-[#0C0D19] hover:text-[#177529]"
                      }`}
                    >
                      Account
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => navigate("/auth")}>
                      Sign In / Sign Up
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate("/profile/:id")}>
                      Profile
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                {/* Theme Toggle */}
                <ActionIcon
                  variant="subtle"
                  onClick={() => setDark((v) => !v)}
                  title="Toggle theme"
                >
                  {dark ? (
                    <IconSun size={20} color="#F8C810" />
                  ) : (
                    <IconMoon size={20} color="#177529" />
                  )}
                </ActionIcon>

                {/* Cart Button */}
                <Button
                  variant="filled"
                  className="bg-[#177529] hover:bg-[#97C040] text-white transition-all"
                  leftSection={<IconShoppingCart size={16} />}
                >
                  {cartCount}
                </Button>
              </Group>
            </div>
          </header>
        )}
      </Transition>

      {/* Drawer for Categories */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} size="lg">
            Browse Categories
          </Text>
        }
        padding="md"
        size="sm"
        overlayProps={{ opacity: 0.5, blur: 2 }}
      >
        {[
          "Groceries",
          "Electronics",
          "Clothing",
          "Home Essentials",
          "Toys & Games",
          "Sports",
        ].map((category) => (
          <Button
            key={category}
            variant="subtle"
            fullWidth
            className="justify-start text-[#177529] hover:text-[#97C040] font-medium"
          >
            {category}
          </Button>
        ))}
      </Drawer>
    </>
  );
}
