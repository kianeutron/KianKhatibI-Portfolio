import type { CaseStudyVisual } from '@/types';
import styles from './CaseStudyDiagram.module.css';

const ARCHITECTURE_ROWS: readonly (readonly string[])[] = [
  ['USER INTENT', 'REACT / VITE', 'ASP.NET CORE API'],
  ['AI CAPABILITY LAYER', 'STRUCTURED INSTRUCTIONS', 'VALIDATE + AUTHORIZE'],
];

const BOUNDARY_NODES: readonly string[] = ['SQL SERVER / APPROVED DATA', 'REPORT MODEL / CANVAS'];

const RECONSTRUCTION_STEPS: readonly string[] = [
  'LEGACY REPORT FILE',
  'BACKEND PARSER',
  'EXTRACTED STRUCTURE',
  'AI BUILD NOTES',
  'DEPENDENCY ORDER',
  'AUTOMATED EXECUTION',
  'REPORT CANVAS',
];

/** A left-to-right chain of nodes joined by arrows. */
function Flow({ nodes, className }: { nodes: readonly string[]; className: string | undefined }) {
  return (
    <div className={className}>
      {nodes.map((node, index) => (
        <span className={styles.flowItem} key={node}>
          <span className={styles.node}>{node}</span>
          {index < nodes.length - 1 && (
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function DownArrow() {
  return (
    <div className={styles.downArrow} aria-hidden="true">
      ↓
    </div>
  );
}

function ArchitectureDiagram() {
  const [intake = [], processing = []] = ARCHITECTURE_ROWS;

  return (
    <figure className={styles.diagram} aria-label="Platform architecture diagram">
      <div className={styles.header}>[ VISUAL_01 // PLATFORM ARCHITECTURE ]</div>
      <div className={styles.body}>
        <Flow nodes={intake} className={styles.flowRow} />
        <DownArrow />
        <Flow nodes={processing} className={styles.flowRow} />
        <DownArrow />
        <div className={styles.boundary}>
          <span className={styles.boundaryLabel}>CUSTOMER DATA BOUNDARY</span>
          <Flow nodes={BOUNDARY_NODES} className={styles.flowRow} />
        </div>
      </div>
      <figcaption>AI interprets. The application controls.</figcaption>
    </figure>
  );
}

function ReconstructionDiagram() {
  return (
    <figure className={styles.diagram} aria-label="Report reconstruction flow diagram">
      <div className={styles.header}>[ VISUAL_02 // REPORT RECONSTRUCTION FLOW ]</div>
      <div className={styles.body}>
        <Flow nodes={RECONSTRUCTION_STEPS} className={styles.reconstruction} />
      </div>
      <div className={styles.result}>
        <span aria-hidden="true">└─&gt;</span> DATA SOURCES + COMPONENTS READY
      </div>
      <figcaption>Technical structure becomes executable build guidance.</figcaption>
    </figure>
  );
}

export function CaseStudyDiagram({ variant }: { variant: CaseStudyVisual }) {
  return variant === 'architecture' ? <ArchitectureDiagram /> : <ReconstructionDiagram />;
}
