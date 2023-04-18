import {useParams} from "react-router-dom";
import {IFeedInfo} from "../../models/mangaChapters";
import {useState} from "react";
import {IFeedChapter} from "../../models/feedChapter";
import {useQueries, useQuery} from "@tanstack/react-query";
import {getMangaBook, getMangaByID, getMangaFeedByID} from "../../services/api";
import {LoadingPage} from "../../LoadingPage";
import ErrorPage from "../../ErrorPage";

export function ReadManga() {

    const {id, mangaIndex} = useParams();

    let feedFilterByEnglish: IFeedInfo[] = [];
    const [mangaPages, setMangaPages] = useState<string[]>([]);

    const mangaInfo = useQuery({
        queryKey: ["mangaInfo"],
        queryFn: () => getMangaByID(id as string),
    });

    const mangaFeed = useQuery({
        queryKey: ["mangaFeed"],
        queryFn: () => getMangaFeedByID(id as string),
    });

    mangaFeed.data?.sort((a, b) => {
        return Number(a.attributes.chapter) - Number(b.attributes.chapter);
    });

    if (mangaFeed.data)
        feedFilterByEnglish = mangaFeed.data
            ?.filter((language) => {
                if (language.attributes.translatedLanguage === "en") return language;
            })
            .slice(0, 10);

    const mangaChapter = useQuery({
        queryKey: ["chapter"],
        queryFn: () => {
            if(mangaIndex) return getMangaBook(feedFilterByEnglish[Number(mangaIndex)].id)
        },
        onSuccess(chapter) {
            if(chapter) setMangaPages(chapter)
        }
    })

    const mangaData = mangaInfo.data;

    if (
        mangaChapter.isLoading ||
        mangaFeed.isLoading ||
        mangaInfo.isLoading ||
        mangaData === undefined
    ) {
        return <LoadingPage />;
    } else if (
        mangaFeed.isError ||
        mangaInfo.isError ||
        mangaChapter.isError
    ) {
        return <ErrorPage />;
    } else {


        return (

            <div>
                <div className="flex flex-wrap justify-center w-1/2 gap-4">
                    {mangaPages.map((page, index) => {
                        return (
                            <img height={50} width={1000} src={page} alt={"page: " + index}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}