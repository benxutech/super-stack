import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ClassValues, cn } from "~/utils/cn.util";

export type TabProp<T extends string> = {
	text: string;
	value: T;
};
type Props<T extends string> = {
	classNames?: ClassValues<"container">;
	data: TabProp<T>[];
	value: T;
	onChange: (tab: T) => void;
	render: (tab: TabProp<T>) => React.ReactNode;
};

const Tabs = <T extends string>({
	value,
	data,
	onChange,
	classNames = {},
	render,
}: Props<T>) => {
	const { container: containerClassName } = classNames;

	return (
		<View className={cn(containerClassName)}>
			{data.map((tab, key) => (
				<TouchableOpacity key={key} onPress={() => onChange(tab.value)}>
					{render(tab)}
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Tabs;
