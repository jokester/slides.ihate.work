import { Octokit } from '@octokit/rest'
import { SourceBundle } from "./SourceBundle"
import { SourceError } from './errors'

export class GistSource {

    get gistPageUrl() {
        if (this.paths.length === 2) {
            const [username, gistId] = this.paths
            return `https://gist.github.com/${username}/${gistId}`
        }
        throw new Error(`invalid gist path: ${this.paths.join('/')}`)
    }

    private get gistId() {
        if (this.paths.length === 2) {
            const [username, gistId] = this.paths
            return gistId
        }
        throw new Error(`invalid gist path: ${this.paths.join('/')}`)
    }

    constructor(private readonly paths: readonly string[], private readonly client = new Octokit()) {
    }

    async fetch(): Promise<SourceBundle> {
        const res = await this.client.rest.gists.get({
            gist_id: this.gistId
        })

        const files = Object.values(res.data.files || {})
        const mds = files.filter((file) => file?.filename?.toLowerCase().endsWith('.md'))
        if (!mds.length) {
            throw new SourceError('no markdown file found in gist')
        }
        if (mds.length > 1) {
            throw new SourceError('multiple markdown files found in gist')
        }

        const [mdFile] = mds

        // TODO: fetch assets (most likely to be images) from gist files or gist comments?
        return {
            slideText: mdFile?.content ?? '',
        }

    }
}