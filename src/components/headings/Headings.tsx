import "./Heading.css";

interface Props {
  content: string;
}

export function PrimaryHeading({ content }: Props) {
  return <h4 className="primary-heading">{content}</h4>;
}
