import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaylistGeneratorProps {
  planetName: string;
  onClose: () => void;
}

interface Song {
  artist: string;
  title: string;
}

const PlaylistGenerator = ({ planetName, onClose }: PlaylistGeneratorProps) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlaylist = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Generate a themed playlist of 10 songs that relate to ${planetName}. Consider the planet's characteristics, atmosphere, and mythology. Format the response as a numbered list with "Artist - Song Title" for each entry.`
          }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate playlist');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the response into song objects
      const songList = content.split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => {
          const match = line.match(/\d+\.\s*(.+)\s*-\s*(.+)/);
          if (match) {
            return {
              artist: match[1].trim(),
              title: match[2].trim()
            };
          }
          return null;
        })
        .filter((song: Song | null) => song !== null);

      setPlaylist(songList);
    } catch (err) {
      setError('Failed to generate playlist. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-secondary rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{planetName} Playlist</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {!playlist.length && !loading && (
          <button
            onClick={generatePlaylist}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            Generate Playlist
          </button>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4">Generating your cosmic playlist...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-4">
            {error}
          </div>
        )}

        <AnimatePresence>
          {playlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ol className="space-y-3">
                {playlist.map((song, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black bg-opacity-30 p-3 rounded-lg"
                  >
                    <span className="text-purple-400">{index + 1}.</span>{' '}
                    <span className="font-semibold">{song.artist}</span> -{' '}
                    <span className="text-gray-300">{song.title}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PlaylistGenerator; 