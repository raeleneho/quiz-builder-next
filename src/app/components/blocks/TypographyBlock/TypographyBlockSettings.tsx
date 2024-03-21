import CustomEditor from '../../CustomEditor';
import { useStepEditorContext } from '../../StepEditor/StepEditorContext';

function TypographyBlockSettings() {
  const stepEditorContext = useStepEditorContext();
  const { selectedBlock, setSelectedBlock } = stepEditorContext || {};

  const handleCustomEditorData = (data: string) => {
    if (selectedBlock && setSelectedBlock) {
      selectedBlock &&
        setSelectedBlock({
          ...selectedBlock,
          data: {
            ...selectedBlock.data,
            textValue: data,
          },
        });
    }
  };

  return <CustomEditor initialData={selectedBlock?.data.textValue} onCustomEditorChange={handleCustomEditorData} />;
}

export default TypographyBlockSettings;
