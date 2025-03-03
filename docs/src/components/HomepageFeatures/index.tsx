import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Comprehensive",
    Svg: require("@site/static/img/bitcoin-money-cryptocurrency-svgrepo-com.svg").default,
    description: (
      <>
        Blockhouse Crypto Dashboard is a comprehensive crypto dashboard that
        provides a wide range of features to help you manage your crypto
        portfolio.
      </>
    ),
  },
  {
    title: "Aesthetic",
    Svg: require("@site/static/img/sparkles.svg").default,
    description: (
      <>
        Blockhouse prides itself on its sleek and modern design, making it easy
        to navigate and understand.
      </>
    ),
  },
  {
    title: "Powered by Next.js",
    Svg: require("@site/static/img/nextjs-icon.svg").default,
    description: (
      <>
        Blockhouse is built on top of Next.js, a popular React framework for
        building server-side rendered apps, making sure all data is loaded as
        fast and efficiently as possible.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
