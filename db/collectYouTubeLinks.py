# -*- coding: utf-8 -*-

import sys, re, pickle
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser


DEVELOPER_KEY = open('devkey').readline()
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

albums_dict_list = pickle.load(open("./albumsDictList.p", "rb"))
start = 0
interval = 50
try:
    start = int(sys.argv[1])
    interval = int(sys.argv[2])
except:
    pass

def create_search_string(artist, song):

    song_title = song.split()
    if re.search('[0-9]+', song_title[0]):
        song_title.pop(0)
    full_title = artist.split() + song_title
    search = " ".join(full_title)
    return search



def youtube_search(keywords, n_results=1):

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY, cache_discovery=False)
    # Call the search.list method to retrieve results matching the specified
    # query term.

    search_response = youtube.search().list(
        q=keywords,
        type='video',
        part="id",
        maxResults=n_results
    ).execute()

    search_videos = []
    for search_result in search_response.get('items', []):
        link = "https://youtube.com/watch?v={}?autoplay=1".format(search_result['id']['videoId'])
        search_videos.append(link)
    return search_videos


def add_songs_dicts(albums_dict_list, start=0, interval=50):

    for i, album in enumerate(albums_dict_list[start-1:], start):
        print i, album[0]
        songs_dict = []
        for song in album[1]['SONGS']:
            search_string = create_search_string(album[1]['ARTIST'], song)

            try:
                youtube_link = youtube_search(search_string)
		youtube_link = youtube_link.replace('watch?v=', 'embed/')
            except Exception, e:
                print 'Error:', repr(e)
                raise BaseException('Request Blocked')
            else:
                song_dict = {"TITLE": song, "YT_LINK": youtube_link}
                songs_dict.append(song_dict)
                print song_dict
        album[1]['SONGS_DICT'] = songs_dict
	if i % interval is 0:
	    pickle.dump(albums_dict_list, open("albumsDictList.p", "wb"))

    pickle.dump(albums_dict_list, open("albumsDictList.p", "wb"))
    return

if __name__ == '__main__':

    try:
	add_songs_dicts(albums_dict_list, start=start, interval=interval)
    except Exception, e:
	print repr(e)
