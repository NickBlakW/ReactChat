import { Platform } from 'react-native';

const reformatImageUri = (uri: string) => {
  const sourceUri = uri;
  const filename = sourceUri.substring(sourceUri.lastIndexOf('/') + 1);

  const uploadUri =
    Platform.OS === 'ios' ? sourceUri.replace('file://', '') : sourceUri;

  return {
    filename: filename,
    uploadUri: uploadUri,
  };
};

export default reformatImageUri;
