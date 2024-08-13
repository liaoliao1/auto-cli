import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from "progress-estimator";
import chalk from "chalk";

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 根目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 最大并发进程数
};

const logger = createLogger({ // 初始化进度条
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item)) // 设置加载动画
  }
})

export const clone = async (url: string, projectName: string, options: string[]) => {
    const git = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中...', {
            estimate: 7000
        });
            console.log()
            console.log(chalk.blueBright(`==================================`))
            console.log(chalk.blueBright(`=== 欢迎使用 auto-cli 脚手架 ===`))
            console.log(chalk.blueBright(`==================================`))
            console.log()
    } catch (error) {
        console.log(error)
    }
}