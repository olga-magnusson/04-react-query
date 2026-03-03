import toast from 'react-hot-toast';
import css from './SearchBar.module.css';


interface SearchBarProps{
    onSubmit: (query: string) => void;
}

export default function SearchBar({onSubmit }: SearchBarProps){
    const handleSubmite = (formData: FormData) => {
        const query = formData.get('query')?.toString().trim();
      
        if (!query) {
          toast.error('Please enter your search query.');
          return;
        }
      
        onSubmit(query);
      };

      return(
        <header className={css.header}>
            <div className={css.container}>
                <a className={css.link} href="www.themoviedb.org" target="_blank" rel="noopener noreferrer">
                    Powered by TMDB
                </a>
                <form className={css.form} action={handleSubmite}>
                    <input 
                    className={css.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    placeholder="Search movie..."
                    autoFocus/>
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
      );
}
