import AddSystemForm from "@/components/AddSystemForm";
import BackButton from "@/components/BackButton";
import HeadingTitle from "@/components/HeadingTitle";

const CreateSystemPage = () => {
  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="max-w-[524px] mx-auto">
        {/* Title */}
        <HeadingTitle title="« Vous venez d'acquérir votre appareil / système, ajoutez-le au programme pour un meilleur suivi. »" />
        <br />

        <div className="ml-1 flex flex-col gap-5">
          {/* Add system */}
          <AddSystemForm />

          {/* Back */}
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default CreateSystemPage;
