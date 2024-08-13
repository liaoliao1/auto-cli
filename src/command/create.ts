import { input, select } from '@inquirer/prompts';
import {clone} from '../utils/clone'

export interface TemplateInfo {
    name: string;
    downloadUrl: string;
    description?: string;
    branch: string;
}

export const templates: Map<string, TemplateInfo> = new Map(
    [
        ['vue-ts', {
            name: 'vue-ts',
            downloadUrl: 'https://github.com/xiaoyao-code/vue-ts-template.git',
            description: 'vue-ts-template',
            branch: 'master'
        }],
        ['Vite-vue3', {
            name: 'Vite-vue3-ts-tsx',
            downloadUrl: 'git@gitee.com:sohucw/react18--vite5---ts.git',
            description: 'Vite-vue3-ts-tsx',
            branch: 'master'
        }]
    ]
)

export async function create(projectName: string) {
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item;
        return {
            name,
            value: name,
            description: info.description
        }
    })
    if (!projectName) {
        projectName = await input({
            message: '请输入项目名称',
            default: 'my-project'
        })
    }

    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })
    const info = templates.get(templateName);
    console.log(info);

    if (info) {
        clone(info.downloadUrl, projectName, ['-b', `${info.branch}`])
    }
}