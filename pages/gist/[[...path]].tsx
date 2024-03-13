import debug from 'debug';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GistSource } from '../../src/core/GistSource';
import Link from 'next/link';
import useSWR from 'swr';

const logger = debug('pages:gist')

function GistSourcePageContent(props: { paths: string[] }) {
    const src = new GistSource(props.paths)

    const gistUrl = src.gistPageUrl
    const { data, error, isLoading } = useSWR(gistUrl, async () => src.fetch())

    logger({ data, error, isLoading })

    return <div>TODO: load and show gist content at <Link href={gistUrl}>{gistUrl}</Link> </div>
}

export default function GistPresentPage() {

    const router = useRouter()

    const [paths, setPaths] = useState<string[] | null>(null)

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        const paths = router.query.path as string[]
        setPaths(paths)
    }, [router, router.isReady])

    if (!paths) {
        return <div>Loading...</div>
    }

    return <GistSourcePageContent paths={paths} />
}