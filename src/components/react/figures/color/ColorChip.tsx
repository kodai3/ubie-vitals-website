import DesignToken from '@ubie/design-tokens';
import ButtonCopy from '@components/react/CopyButton';
import { validateContrast, convertHexWithPercentage, convertDisplayName, deleteAlpha } from '@utils/client';
import styles from './ColorChip.module.css';
import ColorChipValidationIndicator from './ColorChipValidationIndicator';
import type { DesignToken as Token } from '@types';
import type { FC } from 'react';

interface Props {
  token: Token;
}

const ColorChip: FC<Props> = ({ token }) => {
  const cssVariables = `--${token.path?.[0]}-${token.path?.[1]}`;

  const jsonPath = `DesignToken.${token.path?.[0]}['${token.path?.[1]}']`;

  const blackIsValid = validateContrast(token.original.value, DesignToken.color['text-main'].value);

  const whiteIsValid = validateContrast(token.original.value, DesignToken.color['ubie-white'].original.value);

  const name = convertDisplayName(token.name ?? '');

  return (
    <div className={styles.outline} aria-describedby={`${token.name}-heading`}>
      <div className={styles.tile} style={{ backgroundColor: token.value }}>
        <p className={styles.textBlack}>
          A <ColorChipValidationIndicator valid={blackIsValid.AA.normal}></ColorChipValidationIndicator>
        </p>
        <p className={styles.textWhite}>
          A <ColorChipValidationIndicator valid={whiteIsValid.AA.normal}></ColorChipValidationIndicator>
        </p>
      </div>

      <p id={`${token.name}-heading`} className={styles.colorName}>
        {name}
      </p>

      <ul className={styles.valueList}>
        <li className={styles.valueListItem}>
          <div className={styles.value}>
            <p className={styles.valueTypeName}>HEX</p>

            <code className={styles.code}>{convertHexWithPercentage(token.original.value)}</code>
            <ButtonCopy className={styles.copy} text={deleteAlpha(token.original.value)}></ButtonCopy>
          </div>
        </li>
        <li className={styles.valueListItem}>
          <div className={styles.value}>
            <p className={styles.valueTypeName}>CSS Variables</p>

            <code className={styles.code}>{cssVariables}</code>
            <ButtonCopy className={styles.copy} text={`var(${cssVariables})`}></ButtonCopy>
          </div>
        </li>
        <li className={styles.valueListItem}>
          <div className={styles.value}>
            <p className={styles.valueTypeName}>JavaScript Object</p>

            <code className={styles.code}>{jsonPath}</code>
            <ButtonCopy className={styles.copy} text={`var(${jsonPath})`}></ButtonCopy>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ColorChip;
