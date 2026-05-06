import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (input: { title: string; description?: string }) => void;
}

export const TaskForm = ({
  initialTitle = '',
  initialDescription = '',
  submitLabel,
  loading = false,
  onSubmit,
}: TaskFormProps): React.JSX.Element => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [touched, setTouched] = useState(false);

  const titleError = touched && !title.trim() ? 'Title is required' : undefined;

  return (
    <View style={styles.form}>
      <Input
        label="Title *"
        value={title}
        onChangeText={setTitle}
        onBlur={() => setTouched(true)}
        error={titleError}
      />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title={submitLabel}
        loading={loading}
        disabled={!title.trim()}
        onPress={() => onSubmit({ title: title.trim(), description: description.trim() || undefined })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: 18 },
});
