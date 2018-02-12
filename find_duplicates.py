import os

base = '/Users/OGN/Music/iTunes/iTunes Music/Music'
artists = [a for a in os.listdir(base) if not a.startswith('.')]
artists = [base +'/'+a for a in artists]

albums = [[ar+"/"+a for a in os.listdir(ar) if not a.startswith('.')]
             for ar in artists]

albums_flat = [ a for artist in albums for a in artist]
for album in albums_flat:
    songs = os.listdir(album)
    dupes = 0
    for song in songs:
        if ' 1.m' in song:
            dupes += 1
            if dupes > (len(songs) - 2) // 2:
                print(songs)
                break

