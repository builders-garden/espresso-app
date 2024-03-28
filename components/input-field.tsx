import {
  View,
  Text,
  TextInput,
  InputModeOptions,
  KeyboardTypeOptions,
} from "react-native";

const InputField = ({
  label,
  placeholder,
  value,
  inputMode,
  keyboardType,
  onChange,
}: {
  label?: string;
  placeholder: string;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <View className="flex flex-col space-y-2">
      {label && <Text className="text-greyInput">{label}</Text>}
      <View>
        <TextInput
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          inputMode={inputMode || "text"}
          clearButtonMode="while-editing"
          placeholderTextColor={"#8F8F91"}
          className=" text-greyInput px-3 py-4 rounded-lg border border-mutedGrey"
        />
      </View>
    </View>
  );
};

export default InputField;
