import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

interface PropsInputOutlinedArea {
  label?: string;
  onChange?: (text: string) => void;
  mt?: number;
  placeholder?: string;
  keyboardType?: any;
  value?: string;
  height?: number;
  maxLength?: number;
  error?: boolean;
  required?: boolean;
  uppercase?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

const InputOutlinedArea: React.FC<PropsInputOutlinedArea> = ({
  label,
  onChange,
  mt,
  placeholder,
  keyboardType = 'default',
  value,
  height = 120,
  maxLength,
  error,
  required,
  uppercase = 'none',
  editable = true,
}) => {
  return (
    <View style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={label ? `${label}${required ? '*' : ''}` : undefined}
        error={error}
        mode="outlined"
        multiline
        editable={editable}
        numberOfLines={4}
        maxLength={maxLength ?? 9999}
        onChangeText={onChange}
        placeholder={placeholder}
        value={value}
        autoCapitalize={uppercase}
        keyboardType={keyboardType}
        style={{ color: '#49454F', minHeight: height }}
      />
    </View>
  );
};

export default InputOutlinedArea;
