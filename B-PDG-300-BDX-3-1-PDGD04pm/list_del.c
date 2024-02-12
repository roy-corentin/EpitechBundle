/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/list.h"

bool list_del_elem_at_front(list_t *front_ptr) {
  list_t tmp = *front_ptr;

  *front_ptr = (*front_ptr)->next;
  free(tmp);
  return (*front_ptr == NULL);
}

bool list_del_elem_at_back(list_t *front_ptr) {
  list_t tmp = *front_ptr;
  list_t prev = tmp;

  while (tmp->next != NULL) {
    prev = tmp;
    tmp = tmp->next;
  }
  prev->next = NULL;
  free(tmp);
  return true;
}

bool list_del_elem_at_position(list_t *front_ptr, unsigned int position) {
  list_t tmp = *front_ptr;
  list_t prev = tmp;
  unsigned int i = 0;

  if (*front_ptr == NULL)
    return false;

  while (i < position) {
    prev = tmp;
    tmp = tmp->next;
    if (tmp == NULL)
      return false;
    i++;
  }
  prev->next = NULL;
  free(tmp);
  return true;
}

void list_clear(list_t *front_ptr) {
  list_t tmp = *front_ptr;

  while ((*front_ptr) != NULL) {
    tmp = (*front_ptr)->next;
    free((*front_ptr));
    *front_ptr = tmp;
  }
}
