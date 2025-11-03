import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconSearch,
  IconUserCircle,
  IconShoppingCart,
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
  const [cartCount, setCartCount] = useState();
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
      <Transition mounted transition="fade" duration={400} timingFunction="ease">
        {(styles) => (
          <header
            style={styles}
            className={`fixed top-0 left-0 w-full z-50 border-b transition-all font-[Lexend] ${
              dark
                ? "bg-[#0C0D19] border-[#177529]"
                : "bg-white border-[#E5E7EB]"
            } ${scrolled ? "shadow-sm py-2" : "py-3"}`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
              {/* Left: Logo + Mobile Menu */}
              <div className="flex items-center gap-3">
                <ActionIcon
                  variant="transparent"
                  onClick={open}
                  className="md:hidden"
                >
                  <IconMenu2 size={24} color={dark ? "#97C040" : "#177529"} />
                </ActionIcon>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <img
                    src={logo}
                    alt="Campus Katale Logo"
                    className="w-[120px] sm:w-[150px] h-auto"
                  />
                </div>
              </div>

              {/* Center: Search (hidden on mobile) */}
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

              {/* Right: Actions */}
              <Group gap="sm" className="hidden md:flex">
                {/* Add Listing */}
                <Button
                  variant="subtle"
                  leftSection={<IconPlus size={16} />}
                  className={`font-medium flex items-center gap-2 transition-colors duration-300 border-0 shadow-none ${
                    dark
                      ? "bg-transparent text-[#97C040] hover:bg-[#97C040] hover:text-white"
                      : "bg-transparent text-[#177529] hover:bg-[#177529] hover:text-white"
                  }`}
                  onClick={() => navigate("/add-listing")}
                >
                  Add Listing
                </Button>


                {/* Cart */}
                <Button
                  variant="subtle"
                  className="bg-[#177529] hover:bg-[#97C040] text-white transition-all "
                  leftSection={<IconShoppingCart size={16} />}
                >
                  {/* {cartCount} */}
                </Button>

                {/* Account Menu */}
                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      leftSection={<IconUserCircle size={30} />}
                      className={`font-medium ${
                        dark
                          ? "text-[#97C040] hover:text-[#F8C810]"
                          : "text-[#0C0D19] hover:text-[#177529]"
                      }`}
                    >
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
              </Group>

              {/* Mobile Cart + Theme Toggle */}
              <div className="flex md:hidden items-center gap-3">
                <ActionIcon
                  variant="filled"
                  className="bg-[#177529] hover:bg-[#97C040]"
                >
                  <IconShoppingCart size={18} color="#fff" />
                </ActionIcon>
              </div>
            </div>
          </header>
        )}
      </Transition>

      {/* Drawer for Mobile Menu */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} size="lg">
            CampusKatale Menu
          </Text>
        }
        padding="md"
        size="sm"
        overlayProps={{ opacity: 0.5, blur: 2 }}
      >
        <form onSubmit={handleSearch} className="mb-4">
          <TextInput
            icon={<IconSearch size={18} color="#177529" />}
            radius="md"
            placeholder="Search campus deals..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </form>

        {[
          "Home",
          "Groceries",
          "Electronics",
          "Clothing",
          "Essentials",
          "Sports",
          "Contact",
        ].map((category) => (
          <Button
            key={category}
            variant="subtle"
            fullWidth
            onClick={close}
            className="justify-start text-[#177529] hover:text-[#97C040] font-medium"
          >
            {category}
          </Button>
        ))}
      </Drawer>
    </>
  );
}
