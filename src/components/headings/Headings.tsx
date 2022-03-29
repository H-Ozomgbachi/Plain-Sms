import "./Heading.css";

interface Props {
  content: string;
}

export function PrimaryHeading({ content }: Props) {
  return <h1 className="primary-heading">{content}</h1>;
}

export function SecondaryHeading({ content }: Props) {
  return <h2 className="secondary-heading">{content}</h2>;
}

export function TertiaryHeading({ content }: Props) {
  return <h3 className="tertiary-heading">{content}</h3>;
}
