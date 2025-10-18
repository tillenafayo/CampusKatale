import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconSearch,
  IconUser,
  IconShoppingCart,
  IconSun,
  IconMoon,
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

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(3);
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
            className={`fixed top-0 left-0 w-full z-50 border-b ${
              dark
                ? "bg-[#0C0D19] border-[#177529]"
                : "bg-white border-[#E5E7EB]"
            } ${
              scrolled ? "shadow-sm py-2" : "py-3"
            } transition-all font-[Lexend]`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
              {/* Logo */}
              <Group>
                <ActionIcon variant="transparent" onClick={open}>
                  <IconMenu2 size={24} color={dark ? "#97C040" : "#177529"} />
                </ActionIcon>
                <Text
                  fw={700}
                  size="xl"
                  className={`cursor-pointer ${
                    dark ? "text-[#97C040]" : "text-[#177529]"
                  }`}
                  onClick={() => navigate("/")}
                >
                  CampusKatale
                </Text>
              </Group>

              {/* Search */}
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
                      backgroundColor: dark ? "#1e293b" : "#F9FAFB",
                      color: dark ? "#fff" : "#0C0D19",
                      border: "1px solid #E5E7EB",
                    },
                  }}
                  className="w-full"
                />
              </form>

              {/* Right side */}
              <Group gap="sm">
                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      leftSection={<IconUser size={16} />}
                    >
                      Account
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => navigate("/auth")}>
                      Sign In / Sign Up
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate("/profile/:id")}>Profile</Menu.Item>
                    <Menu.Item>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

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

                <Button
                  variant="filled"
                  className="bg-[#177529] hover:bg-[#97C040] text-white"
                  leftSection={<IconShoppingCart size={16} />}
                >
                  {cartCount}
                </Button>
              </Group>
            </div>
          </header>
        )}
      </Transition>

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
            className="justify-start text-[#177529] hover:text-[#97C040]"
          >
            {category}
          </Button>
        ))}
      </Drawer>
    </>
  );
}
