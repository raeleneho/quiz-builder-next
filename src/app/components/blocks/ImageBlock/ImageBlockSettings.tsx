'use client';

import { UploadButton } from '@utils/uploadthing';

import { useStepEditorContext } from '@components/StepEditor/StepEditorContext';
import { FormLabel, Flex, Select } from '@chakra-ui/react';
import { FormInput } from '@components/FormInput';
import { ImageBlockProps } from './ImageBlock';

function ImageBlockSettings() {
  // allow to change image, size and object fit data in the context
  const stepEditorContext = useStepEditorContext();
  const { selectedBlock, setSelectedBlock } = stepEditorContext || {};

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log('Files: ', res[0]);
          if (selectedBlock && setSelectedBlock) {
            selectedBlock &&
              setSelectedBlock({
                ...selectedBlock,
                data: {
                  ...selectedBlock.data,
                  src: res[0].url,
                  alt: res[0].name,
                },
              });
          }
          alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      <img src={selectedBlock?.data?.src} alt={selectedBlock?.data?.name} />

      {selectedBlock &&
        Object.entries(selectedBlock.data).map(([key, value]) => (
          <Flex justify="space-between" gap="1" key={key}>
            <FormLabel fontSize="sm" mb={0}>
              {key}:
            </FormLabel>

            {key === 'objectFit' ? (
              <Select
                placeholder="Select option"
                size="sm"
                bgColor="white"
                boxShadow="sm"
                border=""
                value={selectedBlock?.data?.objectFit}
                onChange={(e) => {
                  if (selectedBlock && setSelectedBlock) {
                    selectedBlock &&
                      setSelectedBlock({
                        ...selectedBlock,
                        data: {
                          ...selectedBlock.data,
                          objectFit: e.target.value as ImageBlockProps['objectFit'],
                        },
                      });
                  }
                }}
              >
                {['cover', 'contain'].map((fitOption) => (
                  <option key={fitOption} value={fitOption}>
                    {fitOption}
                  </option>
                ))}
              </Select>
            ) : (
              <FormInput
                width="auto"
                size="sm"
                bgColor="white"
                boxShadow="sm"
                borderLeftRadius="md"
                value={value}
                onChange={(e) =>
                  setSelectedBlock &&
                  setSelectedBlock({
                    ...selectedBlock,
                    data: {
                      ...selectedBlock.data,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            )}
          </Flex>
        ))}
    </>
  );
}

export default ImageBlockSettings;
