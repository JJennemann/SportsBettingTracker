package com.bettingtracker.sportsbettingtracker.repositories;

import com.bettingtracker.sportsbettingtracker.models.Bettor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BettorRepository extends CrudRepository<Bettor, Integer> {
}
