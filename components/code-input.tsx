import { useRef, useEffect } from "react";
import { TextInput, View } from "react-native";

const CodeInput = ({
  code,
  onChange,
}: {
  code: string[];
  onChange: (value: string[]) => void;
}) => {
  const inputRefs = useRef<TextInput[]>([]);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    onChange(newCode);
    if (text) {
      inputRefs.current[index + 1]?.focus();
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    (inputRefs.current[0] as TextInput)?.focus();
  }, []);
  return (
    <View className="flex flex-row mb-4 space-x-4 justify-around">
      {code.map((value, index) => (
        <TextInput
          key={index}
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          maxLength={1}
          keyboardType="numeric"
          ref={(el: TextInput) =>
            ((inputRefs.current[index] as TextInput) = el as TextInput)
          }
          className="text-4xl text-center basis-1/6 text-greyInput bg-white border-2 border-mutedGrey py-4 rounded-lg"
        />
      ))}
    </View>
  );
};

export default CodeInput;
