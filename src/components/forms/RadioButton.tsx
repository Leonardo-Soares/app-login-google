import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@theme/colors';

interface RadioButtonProps {
  options: string[];
  desativar?: boolean;
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export default function RadioButton({ options, selectedOption, onSelectOption, desativar }: RadioButtonProps) {
  return (
    <View
      style={{
        marginTop: 8,
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          className='flex-row items-center mb-2'
          onPress={desativar ? () => { } : () => onSelectOption(option)}
        >
          <View
            className='rounded-xl justify-center items-center mr-2 w-6 h-6'
            style={{
              borderWidth: 2,
              borderColor: selectedOption === option ? '#6200E8' : 'gray',
            }}>
            {selectedOption === option && (
              <View className='rounded-full bg-[#6200E8] w-3 h-3' />
            )}
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 0,
              textAlign: 'left',
              fontWeight: '400',
              color: colors.dark,
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}



