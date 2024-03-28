import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { LogOut } from "lucide-react-native";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";

export default function AppLayout() {
  const { logout } = usePrivy();
  return (
    <Drawer
      screenOptions={{
        headerShadowVisible: false,
        swipeEdgeWidth: 100,
        headerLeft: () => <DrawerToggleButton />,
        headerRight(props) {
          return (
            <LogOut
              className="mr-8"
              color={"#FF0000"}
              onPress={async () => {
                await logout();
                router.replace("/");
              }}
            />
          );
        },
      }}
    >
      <Drawer.Screen
        name="home" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="transactions" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Transactions",
          title: "Transactions",
        }}
      />
      <Drawer.Screen
        name="items" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Items",
          title: "Items",
        }}
      />
      <Drawer.Screen
        name="profile" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
