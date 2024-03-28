import { CheckCircle, CheckIcon } from "lucide-react-native";
import { FlatList, View, Text, Pressable } from "react-native";

const EmojiGrid = ({
  emojis,
  selected,
  setSelected,
}: {
  emojis: string[];
  selected: string;
  setSelected: (value: string) => void;
}) => {
  const rows = [];
  for (let i = 0; i < emojis.length; i += 8) {
    rows.push(emojis.slice(i, i + 8));
  }
  return (
    <View className="flex flex-col">
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex flex-row justify-around items-center"
        >
          {row.map((emoji, index) => (
            <Pressable onPress={() => setSelected(emoji)}>
              <View
                key={index}
                className={`relative flex items-center justify-center ${emoji === selected ? "" : "opacity-30"}`}
              >
                <Text className="text-6xl p-2">{emoji}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default EmojiGrid;
