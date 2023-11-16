import FormHeader from "../formHeader/FormHeader";
import FormDifficultySelect from "../formDifficultySelect/FormDifficultySelect";
import FormTags from "../formTags/FormTags";
import FormAnswers from "../formAnswers/FormAnswers";

const Form = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <FormHeader />
        <FormDifficultySelect />
        <FormTags />
        <FormAnswers />
      </div>
    </form>
  );
};

export default Form;