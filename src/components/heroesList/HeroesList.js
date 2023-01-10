// import {useHttp} from '../../hooks/http.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

// import { heroDeleted, fetchHeroes } from '../heroesList/heroesSlice';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const {
        data: heroes = [],
        // isFetching,
        isLoading,
        // isSuccess,
        // error,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);
   
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
        // eslint-disable-next-line
    }, [heroes, activeFilter]);

    // const filteredHeroes = useSelector(filteredHeroesSelector);
    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const activeFilter = useSelector(state => state.filters.activeFilter);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes());
    //     // eslint-disable-next-line
    // }, []);

    const onDelete = useCallback(id => {
        deleteHero(id);
        // request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        //     .then(data => console.log(data, 'Deleted'))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));

        // eslint-disable-next-line
    }, []);

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    // const elements = renderHeroesList(filteredHeroes);
    const elements = renderHeroesList(filteredHeroes);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <ul>
            <TransitionGroup component='ul'>
                <h2 className='text-center'>{activeFilter}</h2>
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;