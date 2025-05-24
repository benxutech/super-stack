import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { cn } from "~/utils/cn.util";

type RenderTabArgs = {
	descriptor: BottomTabBarProps["descriptors"][string];
	isFocused: boolean;
};

type Props = {
	renderTab: (args: RenderTabArgs) => ReactNode;
} & BottomTabBarProps;

const TabBarRouter = ({ descriptors, navigation, state, renderTab }: Props) => {
	return (
		<View
			className={cn(
				"bg-black absolute left-[50%] -translate-x-[50%]",
				"bottom-safe-offset-0 flex flex-row",
				"gap-8 px-3 rounded-full items-center"
			)}
		>
			{state.routes.map((route) => (
				<Tab
					key={route.key}
					navigation={navigation}
					descriptor={descriptors[route.key]}
					isFocused={state.index === state.routes.indexOf(route)}
				>
					{renderTab({
						descriptor: descriptors[route.key],
						isFocused: state.index === state.routes.indexOf(route),
					})}
				</Tab>
			))}
		</View>
	);
};

type TabProps = {
	descriptor: BottomTabBarProps["descriptors"][string];
	navigation: BottomTabBarProps["navigation"];
	isFocused: boolean;
	children: React.ReactNode;
};

const Tab = ({ navigation, isFocused, descriptor, children }: TabProps) => {
	const {
		route: { name: routeName, key },
	} = descriptor;
	return (
		<Pressable
			key={key}
			onPress={() => {
				const event = navigation.emit({
					type: "tabPress",
					target: key,
					canPreventDefault: true,
				});

				if (!isFocused && !event.defaultPrevented)
					navigation.navigate(routeName);
			}}
		>
			{children}
		</Pressable>
	);
};

export default TabBarRouter;
