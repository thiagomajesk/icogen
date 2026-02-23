import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SearchInputProps) {
  return (
    <TextInput
      aria-label={ariaLabel ?? placeholder ?? "search"}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder={placeholder}
      leftSection={<IconSearch size={16} />}
    />
  );
}
