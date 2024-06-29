import Image from "@/components/Image";

type QuestionProps = {
    content: string;
};

const Question = ({ content }: QuestionProps) => (
    <div className="flex">
        <div className="shrink-0 mr-4">
            <Image
                className="w-8 h-8 rounded-full opacity-100"
                src="/images/avatar-4.png"
                width={32}
                height={32}
                alt=""
            />
        </div>
        <div className="grow self-center text-body-1m text-theme-secondary">
            {content}
        </div>
    </div>
);

export default Question;
