import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '易于使用',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        通过节点的组合与链接即可构造出完整自洽的逻辑，请放心，这种方式经过无数验证的。
      </>
    ),
  },
  {
    title: '简单高效',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        codeck
        提供的是简单高效的编程体验，项目本身也是有一定的维护成本的，而太初就类似serverless，将这种成本降低到无
      </>
    ),
  },
  {
    title: '基于网页',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        无需安装臃肿的客户端，随时随地开启创作！通过浏览器探索属于你自己的编程世界
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
