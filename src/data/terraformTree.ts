/**
 * Static, read-only snapshot of the aws-infra folder.
 * Language-neutral (file names), rendered by TerraformPreview.astro.
 * No other repository folders are included.
 */
export interface TerraformNode {
  name: string;
  kind: 'folder' | 'file';
  children?: TerraformNode[];
}

const file = (name: string): TerraformNode => ({ name, kind: 'file' });
const folder = (name: string, children: TerraformNode[]): TerraformNode => ({
  name,
  kind: 'folder',
  children,
});

const tfFiles: TerraformNode[] = [
  file('main.tf'),
  file('outputs.tf'),
  file('variables.tf'),
  file('versions.tf'),
];

export const terraformTree: TerraformNode = folder('aws-infra', [
  file('README.md'),
  file('.gitignore'),
  folder('bootstrap', [...tfFiles, file('.terraform.lock.hcl')]),
  folder('envs', [
    folder('control-plane', [
      file('.terraform.lock.hcl'),
      file('dns.tf'),
      file('iam.tf'),
      file('main.tf'),
      file('oidc.tf'),
      file('outputs.tf'),
      file('pages.tf'),
      file('terraform.tfvars.example'),
      file('variables.tf'),
      file('versions.tf'),
    ]),
    folder('prod', [
      file('.terraform.lock.hcl'),
      file('main.tf'),
      file('outputs.tf'),
      file('terraform.tfvars.example'),
      file('variables.tf'),
      file('versions.tf'),
    ]),
  ]),
  folder('modules', [
    folder('control-plane', [
      ...tfFiles,
      folder('lambda', [
        file('admin_sleep.py'),
        file('sleep_check.py'),
        file('status.py'),
        file('wake.py'),
      ]),
    ]),
    folder('data', [...tfFiles]),
    folder('ecs', [...tfFiles]),
    folder('ingress', [...tfFiles]),
    folder('network', [...tfFiles]),
    folder('registry', [...tfFiles]),
    folder('storage', [...tfFiles]),
  ]),
  folder('scripts', [file('update-cloudflare.mjs')]),
  folder('status-page', [file('index.html')]),
]);
