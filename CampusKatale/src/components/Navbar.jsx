import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconSearch,
  IconUser,
  IconShoppingCart,
  IconChevronDown,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  Group,
  Menu,
  Text,
  TextInput,
  Transition,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const navigate = useNavigate();

  // Toggle theme with keyboard shortcut
  useHotkeys([["mod+J", () => setDark((v) => !v)]]);

  // Detect scroll to shrink navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
          <Box
            style={styles}
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md ${
              dark ? "bg-gray-900/70" : "bg-white/70"
            } border-b ${scrolled ? "shadow-md py-2" : "py-4"} transition-all`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Left: Logo and Menu */}
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color={dark ? "yellow" : "blue"}
                  onClick={open}
                >
                  <IconMenu2 size={24} />
                </ActionIcon>
                <Text
                  fw={700}
                  size="xl"
                  className={`cursor-pointer ${
                    dark ? "text-yellow-400" : "text-sky-600"
                  }`}
                >
                  CampusKatale
                </Text>
              </Group>

              {/* Center: Search */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex w-1/2 justify-center"
              >
                <TextInput
                  icon={<IconSearch size={18} color="#0284c7" />}
                  radius="md"
                  placeholder="Search essentials, groceries, and more..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                  styles={{
                    input: {
                      backgroundColor: dark ? "#1e293b" : "#f1f8fc",
                      color: dark ? "#fff" : "#000",
                      border: "none",
                    },
                  }}
                  className="w-full"
                />
              </form>

              {/* Right: Profile, Theme, Cart */}
              <Group gap="xs">
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
                    <Menu.Item onClick={() => alert("Sign In / Sign Up clicked")}>
                      Sign In / Sign Up
                    </Menu.Item>
                    <Menu.Item onClick={() => alert("Profile clicked")}>
                      Profile
                    </Menu.Item>
                    <Menu.Item onClick={() => alert("Logout clicked")}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <ActionIcon
                  variant="subtle"
                  onClick={() => setDark((v) => !v)}
                  title="Toggle theme"
                >
                  {dark ? (
                    <IconSun size={20} color="#facc15" />
                  ) : (
                    <IconMoon size={20} color="#0284c7" />
                  )}
                </ActionIcon>

                <Button
                  variant="default"
                  leftSection={<IconShoppingCart size={16} />}
                  onClick={() => alert("Go to cart")}
                >
                  Cart
                  <Badge
                    size="sm"
                    color="red"
                    radius="sm"
                    ml={6}
                    variant="filled"
                  >
                    {cartCount}
                  </Badge>
                </Button>
              </Group>
            </div>
          </Box>
        )}
      </Transition>

      {/* Drawer Menu (Mobile) */}
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
            className="justify-start"
            onClick={() => alert(`Go to ${category}`)}
          >
            {category}
          </Button>
        ))}
      </Drawer>
    </>
  );
}
