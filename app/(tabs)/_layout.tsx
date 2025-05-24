import TabBarRouter from "@/lib/components/tab-bar-router";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type Props = {};

const Layout = (props: Props) => {
	return (
		<Tabs
			tabBar={(props) => (
				<TabBarRouter
					{...props}
					renderTab={({
						descriptor: {
							options: { title, tabBarIcon },
						},
						isFocused,
					}) => (
						<View>
							<Text className="text-white">{title}</Text>
							{tabBarIcon &&
								tabBarIcon({
									color: "black",
									size: 24,
									focused: isFocused,
								})}
						</View>
					)}
				/>
			)}
		>
			<Tabs.Screen name="index" options={{ title: "Home" }} />
			<Tabs.Screen name="profile" options={{ title: "Profile" }} />
		</Tabs>
	);
};

export default Layout;
